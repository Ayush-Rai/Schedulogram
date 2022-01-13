import { contentActions } from "./content";
export const fetchContentData = () => {
  return async (dispatch) => {
    const fetchContent = async () => {
      const response = await fetch("http://localhost:8080/contents/");
      if (!response.ok) {
        throw new Error("Could not fetch your contents");
      }
      const data = await response.json();
      return data[0];
    };

    try {
      const contentData = await fetchContent();
      dispatch(contentActions.replaceContent(contentData));
    } catch (error) {
      console.log(error);
    }
  };
};


export const saveContentData = (content) => {
  return async (dispatch) => {
    const fetchContent = async () => {
      const response = await fetch("http://localhost:8080/contents/");
      if (!response.ok) {
        throw new Error("Could not fetch your contents");
      }
      const data = await response.json();
      return data[0];
    };

    try {
      const contentData = await fetchContent();
      const id = contentData.id;
      const response = await fetch("http://localhost:8080/contents/update?id=" + id, {
        method: "PUT",
        body: JSON.stringify(content),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        console.log(JSON.stringify(content));
        console.log(content);
        throw new Error("Could not save your contents");
      }
        console.log(contentData);
        dispatch(contentActions.replaceContent(content));
        
    } catch (error) {
      console.log(error);
    }
  };
};

export const saveAttendanceData = (payload) => {
  return async (dispatch) => {
    const fetchContent = async () => {
      const response = await fetch("http://localhost:8080/contents/");
      if (!response.ok) {
        throw new Error("Could not fetch your contents");
      }
      const data = await response.json();
      return data[0];
    };

    try {
      const contentData = await fetchContent();
      const id = contentData.id;
      const activity=payload.attendanceActivity;
      console.log("INSIDE -> ",payload);
      const response = await fetch("http://localhost:8080/contents/addAttendance?id=" + id+"&day="+payload.day+"&itemId="+payload.id, {
        method: "PATCH",
        body: JSON.stringify(activity),
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch(contentActions.updateAttendance({itemId:payload.id,day:payload.day,attendanceActivity:activity}));
      if (!response.ok) {
        console.log(JSON.stringify(payload));
        console.log(payload);
        throw new Error("Could not save your attendance activities");
      }
        console.log(contentData);
    } catch (error) {
      console.log(error);
    }
  };
};