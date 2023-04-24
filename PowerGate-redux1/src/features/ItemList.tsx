import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  fetchPhotos,
  onChangeValue,
  confirmValue,
} from "./itemSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import Itemm from "./Item";

const Skeletons = () => {
  const skeletons = [];

  for (let i = 0; i < 10; i++) {
    skeletons.push(<div>...Loading</div>);
  }
  return <div>{skeletons}</div>;
};

const PhotoMore: React.FC = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);

  const {
    originValue: initValue,
    updatedValue,
    isLoading,
  } = useSelector((state: RootState) => state.items);

  const handleSubmit = () => {
    dispatch(confirmValue(updatedValue));
  };

  const handleReset = () => {
    dispatch(onChangeValue(initValue));
  };

  const observer = useRef<IntersectionObserver>();
  const lastRowRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prePage) => prePage + 1);
          }
        }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  useEffect(() => {
    dispatch(fetchPhotos(page));
  }, [page, dispatch]);

  const handleOnChange = React.useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      id: number
    ) => {
      const value = e.target.value;
      const index = updatedValue.findIndex(
        (photo) => photo.id === id
      );
      const updatedPhoto = {
        ...updatedValue[index],
        title: value,
        time: Date.now(),
      };
      const newUpdatedValue = [...updatedValue];
      newUpdatedValue[index] = updatedPhoto;
      dispatch(onChangeValue(newUpdatedValue));
    },
    [updatedValue, dispatch]
  );

  const renderPhotos = () => {
    return updatedValue.map((data, index) => {
      return (
        <div
          key={index}
          ref={
            index === updatedValue.length - 1
              ? lastRowRef
              : null
          }
        >
          <Itemm
            key={data.id}
            data={data}
            onTitleChange={handleOnChange}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          zIndex: "1",
          top: 0,
          width: "100%",
          padding: "20px 0",
          background: "#fff",
        }}
      >
        <button
          style={{ marginRight: 20 }}
          disabled={
            JSON.stringify(initValue) ===
            JSON.stringify(updatedValue)
          }
          onClick={handleSubmit}
        >
          Confirm
        </button>
        <button
          disabled={
            JSON.stringify(initValue) ===
            JSON.stringify(updatedValue)
          }
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div>{renderPhotos()}</div>
      {isLoading && <Skeletons />}
    </div>
  );
};

export default PhotoMore;
