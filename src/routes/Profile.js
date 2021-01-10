import WebtoonsDayInfo from "components/WebtoonsDayInfo";
import { dbService } from "fbase";
import React, { useEffect, useState, useCallback } from "react";

const webtoonSites = ["naver"]; // 웹툰사이트를 추가할때마다 확인해줘야 함.
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const Profile = ({ userObj }) => {
  const [myWebtoons, setMyWebtoons] = useState(undefined);
  const getFromFirestore = useCallback(() => {
    webtoonSites.forEach((siteName) => {
      let siteDayWebtoons = {};
      days.forEach(async (day) => {
        await dbService
          .collection(userObj.uid)
          .doc(siteName)
          .collection(day)
          .onSnapshot((snapShot) => {
            const webtoonArr = snapShot.docs.map((doc) => doc.data());
            siteDayWebtoons[day] = webtoonArr;
          });
      });
      myWebtoons[siteName] = siteDayWebtoons;
    });
  }, [myWebtoons, userObj]);

  useEffect(() => {
    getFromFirestore();
    return () => {
      // ComponentDidUnmount.
    };
  }, [getFromFirestore]);

  return (
    <div className="profile-mainscreen">
      <h2 className="webtoon_site__title">My Webtoon</h2>
      <div className="list_area daily_all">
        {myWebtoons
          ? // 여기안에서 데이터를 변경하지말고 이미 변경이완료된 데이터를 불러와서 사용하는것이 좋습니다
            Object.keys(myWebtoons).map((siteName) => (
              <div className="devide_by_webtoon_site">
                {days.map((day) =>
                  myWebtoons[siteName][day] ? (
                    <WebtoonsDayInfo
                      webtoonList={myWebtoons[siteName][day]}
                      key={`${siteName}/${day}`}
                      day={day}
                      userObj={userObj}
                      siteName=""
                    />
                  ) : undefined
                )}
              </div>
            ))
          : "Loading ..."}
      </div>
    </div>
  );
};

export default Profile;
/*
import WebtoonsDayInfo from "components/WebtoonsDayInfo";
import { dbService } from "fbase";
import React, { useCallback, useEffect, useState } from "react";
const Profile = ({ userObj }) => {
  const webtoonSites = ["naver"]; // 웹툰사이트를 추가할때마다 확인해줘야 함.
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const [dataInit, setDataInit] = useState(false);
  const [myWebtoons, setMyWebtoons] = useState({});
  useEffect(() => {
    getFromFirestore();
  }, []);
  const getFromFirestore = () => {
    setData();
    setDataInit(true);
  };
  const setData = useCallback(() => {
    webtoonSites.forEach((siteName) => {
      let siteDayWebtoons = {};
      days.forEach((day) => {
        dbService
          .collection(userObj.uid)
          .doc(siteName)
          .collection(day)
          .onSnapshot((snapShot) => {
            const webtoonArr = snapShot.docs.map((doc) => doc.data());
            siteDayWebtoons[day] = webtoonArr;
          });
      });
      myWebtoons[siteName] = siteDayWebtoons;
    });
  }, []);
  return (
    <div className="profile-mainscreen">
      <h2 className="webtoon_site__title">My Webtoon</h2>
      <div className="list_area daily_all">
        {dataInit
          ? Object.keys(myWebtoons).map((siteName) => (
              <div className="devide_by_webtoon_site">
                {days.map((day) => {
                  if (myWebtoons[siteName][day] !== undefined) {
                    return (
                      <WebtoonsDayInfo
                        webtoonList={myWebtoons[siteName][day]}
                        key={`${siteName}/${day}`}
                        day={day}
                        userObj={userObj}
                        siteName=""
                      />
                    );
                  }
                })}
              </div>
            ))
          : "Loading ..."}
      </div>
    </div>
  );
};

export default Profile;
*/
