import WebtoonsDayInfo from "components/WebtoonsDayInfo";
import { dbService } from "fbase";
import React, { useEffect, useState, useCallback } from "react";

const webtoonSites = ["naver"]; // 웹툰사이트를 추가할때마다 확인해줘야 함.
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const Profile = ({ userObj }) => {
  const [dataInit, setDataInit] = useState(false);
  const [myWebtoons, setMyWebtoons] = useState({});
  const getFromFirestore = useCallback(() => {
    webtoonSites.forEach((siteName) => {
      days.forEach(async (day) => {
        await dbService
          .collection(userObj.uid)
          .doc(siteName)
          .collection(day)
          .onSnapshot((snapShot) => {
            const webtoonArr = snapShot.docs.map((doc) => doc.data());
            setMyWebtoons((prev) => {
              return {
                ...prev,
                [siteName]: {
                  ...prev[siteName],
                  [day]: webtoonArr,
                },
              };
            });
          });
      });
    });
    setDataInit(true);
  }, [myWebtoons, userObj]);

  useEffect(() => {
    console.log("MOUNT");
    getFromFirestore();
    return () => {
      // ComponentDidUnmount.
    };
  }, []);

  return (
    <div className="profile-mainscreen">
      {console.log("RENDERING")}
      <h2 className="webtoon_site__title">My Webtoon</h2>
      <div className="list_area daily_all">
        {dataInit
          ? // 여기안에서 데이터를 변경하지말고 이미 변경이완료된 데이터를 불러와서 사용하는것이 좋습니다
            Object.keys(myWebtoons).map((siteName) => (
              <>
                <div className="devide_by_webtoon_site">
                  {days.map((day) =>
                    myWebtoons[siteName][day] ? (
                      <WebtoonsDayInfo
                        webtoonList={myWebtoons[siteName][day]}
                        key={`${siteName}/${day}`}
                        day={day}
                        userObj={userObj}
                        siteName={siteName}
                      />
                    ) : undefined
                  )}
                </div>
              </>
            ))
          : undefined}
      </div>
    </div>
  );
};
export default Profile;
