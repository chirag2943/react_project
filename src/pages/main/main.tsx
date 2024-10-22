import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export interface postInterface {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<postInterface[] | null>(null);
  const postRef = collection(db, "posts"); //reference of database
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const getPosts = async () => {
    //getting post from db
    const data = await getDocs(postRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as postInterface[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="home">
      {user ? (
        postsList?.map((post) => <Post post={post} />)
      ) : (
        <>{navigate("/login")}</>
      )}
    </div>
  );
};
