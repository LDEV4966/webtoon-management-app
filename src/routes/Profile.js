import Loading from "components/Loading";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
const Profile = ({ userObj }) => {
  const webtoonSites = ["naver", "daum"]; // 웹툰사이트를 추가할때마다 확인해줘야 함.
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const [dataInit, setDataInit] = useState(false);
  const [myWebtoons, setMyWebtoons] = useState({});
  useEffect(() => {
    if (dataInit === false) {
      getFromFirestore();
    }
  }, []);
  const getFromFirestore = async () => {
    webtoonSites.map((siteName) => {
      let dayWebtoons = {};
      days.map((day) => {
        dbService
          .collection(userObj.uid)
          .doc(siteName)
          .collection(day)
          .onSnapshot((snapShot) => {
            const webtoonArr = snapShot.docs.map((doc) => ({
              ...doc.data(),
            }));
            if (webtoonArr.length !== 0) {
              dayWebtoons[day] = webtoonArr;
            }
          });
        return 0;
      });
      myWebtoons[siteName] = dayWebtoons;
      return 0;
    });
    console.log(myWebtoons);
    setDataInit(true);
  };
  return (
    <div>
      <h2 className="webtoon_site__title">My Webtoon</h2>
      <div className="list_area daily_all">
        {dataInit
          ? webtoonSites.map((siteName) => {
              days.map((day) => (
                <div>
                  <div>{day}</div>
                </div>
              ));
            })
          : "Loading ..."}
      </div>
    </div>
  );
};

export default Profile;
