import styles from "../styles/Profile.module.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProfilePostGrid from "../components/ProfilePostGrid";

import {
  fetchEditUserAbout,
  fetchUploadCoverPhoto,
  fetchUploadProfilePhoto,
  fetchUserProfile,
} from "../services/userServices";

import {
  resizeCoverPhoto,
  resizeProfilePhoto,
} from "../utils/resizeCoverPhoto";

import { loginUser, logoutUser } from "../slice/userSlice";
import { closeModal, openModal } from "../slice/modalSlice";

export default function Profile() {
  const { username } = useParams();
  const { user } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("posts");
  const [previewProfilePhotoUrl, setPreviewProfilePhotoUrl] = useState(null);
  const [previewCoverPhotoUrl, setPreviewCoverPhotoUrl] = useState(null);
  const [editAbout, setEditAbout] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [about, setAbout] = useState(userProfile?.about);

  const profile = user._id === userProfile?._id ? user : userProfile;

  const coverPhotoRef = useRef(null);
  const profilePhotoRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleEditAbout(e) {
    e.preventDefault();
    await fetchEditUserAbout(about, userProfile._id);
    setEditAbout(false);
  }

  function handleChangeCoverPhoto() {
    resizeCoverPhoto(
      coverPhotoRef.current.files[0],
      setPreviewCoverPhotoUrl,
      async (newImage) => {
        const formData = new FormData();
        formData.append("coverPhoto", newImage);
        formData.append("fileName", newImage.name);
        const data = await fetchUploadCoverPhoto(formData, newImage.name);
        if (data.error)
          console.log("Error, unable to upload image please try again later");
      }
    );
  }

  function handleChangeProfilePhoto() {
    resizeProfilePhoto(
      profilePhotoRef.current.files[0],
      setPreviewProfilePhotoUrl,
      async (newImage) => {
        const formData = new FormData();
        formData.append("profilePhoto", newImage);
        formData.append("fileName", newImage.name);
        const data = await fetchUploadProfilePhoto(formData, newImage.name);
        if (data.error) {
          console.log("Error, unable to upload image please try again later");
          return;
        }
        dispatch(loginUser(data));
      }
    );
  }

  useEffect(() => {
    async function getUser() {
      const data = await fetchUserProfile(username);
      if (data.error === "jwt expired") {
        dispatch(logoutUser());
        navigate("/login");
      }
      setUserProfile(data);
      dispatch(closeModal());
      setAbout(data.about);
    }
    getUser();
  }, [username, dispatch, navigate]);

  if (profile)
    return (
      <main className={styles.profile}>
        <div className={styles.profileImages}>
          <div className={styles.coverPhoto}>
            {user._id === profile._id ? (
              <>
                <label htmlFor="coverPhoto">Change Photo</label>
                <input
                  type="file"
                  name="coverPhoto"
                  id="coverPhoto"
                  ref={coverPhotoRef}
                  onChange={handleChangeCoverPhoto}
                />
              </>
            ) : null}
            <img
              src={previewCoverPhotoUrl || profile.coverPhotoUrl}
              alt="cover photo"
            />
          </div>

          <div className={styles.profileImage}>
            <img
              src={previewProfilePhotoUrl || profile.imageUrl}
              alt="profile picture"
            />
            {user._id === profile._id ? (
              <>
                <label htmlFor="profilePhoto">
                  <i className="fa-regular fa-images"></i>
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  id="profilePhoto"
                  ref={profilePhotoRef}
                  onChange={handleChangeProfilePhoto}
                />
              </>
            ) : null}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.userInfo}>
            <h3 className={styles.name}>{profile.fullname}</h3>
            <p className={styles.username}>@{profile.username}</p>
            <p className={styles.email}>{profile.email}</p>
            <ul className={styles.userStats}>
              <li>
                <span>{profile?.posts?.length || 0}</span>Posts
              </li>
              <li
                onClick={() =>
                  dispatch(openModal({ type: "followers", username }))
                }
              >
                <span>{profile?.followers?.length}</span>Followers
              </li>
              <li
                onClick={() =>
                  dispatch(openModal({ type: "following", username }))
                }
              >
                <span>{profile?.following?.length}</span>Following
              </li>
            </ul>
            {editAbout ? (
              <form onSubmit={handleEditAbout}>
                <input
                  className={styles.about}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </form>
            ) : (
              <p className={styles.about}>
                <span>{about || "About me"}</span>
                {profile._id === user._id ? (
                  <i
                    className="fa-solid fa-pen-to-square"
                    title="Edit about"
                    onClick={() => setEditAbout(true)}
                  ></i>
                ) : null}
              </p>
            )}
          </div>
          <div className={styles.posts}>
            <div className={styles.header}>
              <ul>
                <li
                  onClick={() => setActiveTab("posts")}
                  className={activeTab === "posts" ? styles.active : ""}
                >
                  Posts
                </li>
                <li
                  onClick={() => setActiveTab("liked")}
                  className={activeTab === "liked" ? styles.active : ""}
                >
                  Liked
                </li>
                {user._id === profile._id ? (
                  <li
                    onClick={() => setActiveTab("saved")}
                    className={activeTab === "saved" ? styles.active : ""}
                  >
                    Saved
                  </li>
                ) : null}
              </ul>
            </div>
            <ProfilePostGrid type={activeTab} user={profile} />
          </div>
        </div>
      </main>
    );
}
