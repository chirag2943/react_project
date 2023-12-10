import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("you must write title"),

    description: yup.string().required("you must write your content"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };

  return (
    <div className="createPost">
      <form onSubmit={handleSubmit(onCreatePost)}>
        <input
          className="postTitle"
          placeholder="title..."
          {...register("title")}
        />
        <p style={{ color: "red" }}>{errors.title?.message}</p>
        <textarea
          className="postDescription"
          placeholder="description..."
          {...register("description")}
        />
        <p style={{ color: "red" }}>{errors.description?.message}</p>
        <input className="submitButton" type="submit" />
      </form>
    </div>
  );
};
