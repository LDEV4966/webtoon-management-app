import AltNavigation from "components/AltNavigation";
import Loading from "components/Loading";
import WebtoonsDayInfo from "components/WebtoonsDayInfo";
import { dbService } from "fbase";
import React, { useEffect, useState, useCallback } from "react";

const webtoonSites = ["naver"]; // I have to check it everytime add webtoon site
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
  }, [userObj]);

  useEffect(() => {
    if (userObj !== null) {
      getFromFirestore();
    }
    return () => {};
  }, [userObj, getFromFirestore]); //if userObj is changed, mount again that means it can executes getFromFirestore(); again with different User-uid.

  return (
    <div className="profile-mainscreen">
      <div className="webtoon_site__nav">
        <AltNavigation />
      </div>
      <h2 className="webtoon_site__title">My Webtoon</h2>
      <div className="list_area daily_all">
        {dataInit ? (
          Object.keys(myWebtoons).map((siteName) => (
            <div className="devide_by_webtoon_site" key={siteName}>
              {days.map((day) =>
                myWebtoons[siteName][day] ? (
                  <WebtoonsDayInfo
                    webtoonList={myWebtoons[siteName][day]}
                    key={days.indexOf(day)}
                    day={day}
                    userObj={userObj}
                    siteName={siteName}
                    favorite={false}
                  />
                ) : undefined
              )}
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
export default Profile;
