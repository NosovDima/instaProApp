import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import {
  posts,
  goToPage,
  getToken,
  updatePosts,
  page,
  renderApp,
} from "../index.js";
import { addLike, removeLike, getPosts, postDelete } from "../api.js";
import { replaceFunction } from "../helpers.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function renderPostsPageComponent() {
  // TODO: реализовать рендер постов из api -  Done

  const appEl = document.getElementById("app");
  const allPosts = posts.map((post) => {
    return {
      postId: post.id,
      userId: post.user.id,
      userImageUrl: post.user.imageUrl,
      createdAt: formatDistanceToNow(new Date(post.createdAt), {
        locale: ru,
      }),
      userName: replaceFunction(post.user.name),
      userLogin: post.user.login,
      imageUrl: post.imageUrl,
      isLiked: post.isLiked,
      usersLikes: post.likes,
      description: post.description,
    };
  });

  const appHtml = allPosts
    .map((post, index) => {
      const userStorage = JSON.parse(window.localStorage.getItem("user"));
      const userStorageId = userStorage ? userStorage._id : null;

      return `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        <li class="post" data-id="${post.postId}">
          <div class="post-header" data-user-id="${post.userId}">
              <img src="${post.userImageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.userName}</p>
          </div>
          
          <div class="post-image-container">
            <img class="post-image" data-post-id="${post.postId}" src="${
        post.imageUrl
      }" data-index="${index}">
      <div class="like-animation"></div>

            </div>
          <div class="post-likes">
            <button data-post-id="${
              post.postId
            }" data-index="${index}" class="like-button">
              <img src="${
                post.isLiked
                  ? "./assets/images/like-active.svg"
                  : "./assets/images/like-not-active.svg"
              }">
            </button>
            <p class="post-likes-text">
              Нравится: ${
                post.usersLikes.length > 0
                  ? `${post.usersLikes[post.usersLikes.length - 1].name} ${
                      post.usersLikes.length - 1 > 0
                        ? "и ещё " + (post.usersLikes.length - 1)
                        : ""
                    }`
                  : "0"
              }
            </p>
            <div class="delete-button-container">
              <button class="delete-button ${
                userStorage === null || post.userId !== userStorageId
                  ? "hidden"
                  : ""
              }" id="button-delete" data-post-id="${
        post.postId
      }">Удалить</button>
            </div>


          </div>
          <p class="post-text">
            <span class="user-name">${post.userName}</span>
            ${post.description}
          </p>
          <p class="post-date">
            ${post.createdAt} назад
          </p>
        </li>
      </ul>
    </div>`;
    })
    .join("");
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  likeEventListener({ token: getToken() });
  likeImageEventListener({ token: getToken() });
  postDeleteEventListener({ token: getToken() });
}
export function likeEventListener() {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const postId = likeButton.dataset.postId;
      const index = likeButton.dataset.index;
      const postHeader = document.querySelector(".post-header");
      const userId = postHeader.dataset.userId;

      if (posts[index].isLiked) {
        removeLike({ token: getToken(), postId })
          .then(() => {
            posts[index].isLiked = false;
          })
          .then(() => {
            getPosts({ token: getToken(), userId }).then((response) => {
              if (page === USER_POSTS_PAGE) {
                updatePosts(response);
                goToPage(USER_POSTS_PAGE, {
                  userId,
                });
              } else {
                updatePosts(response);
                renderApp();
              }
            });
          });
      } else {
        addLike({ token: getToken(), postId })
          .then(() => {
            posts[index].isLiked = true;
          })
          .then(() => {
            getPosts({ token: getToken(), userId }).then((response) => {
              if (page === USER_POSTS_PAGE) {
                updatePosts(response);
                goToPage(USER_POSTS_PAGE, {
                  userId,
                });
              } else {
                updatePosts(response);
                renderApp();
              }
            });
          });
      }
    });
  });
}

export function likeImageEventListener() {
  const likeButtons = document.querySelectorAll(".post-image");

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("dblclick", (event) => {
      event.stopPropagation();
      const postId = likeButton.dataset.postId;
      const index = likeButton.dataset.index;
      const postHeader = document.querySelector(".post-header");
      const userId = postHeader.dataset.userId;

      if (posts[index].isLiked) {
        removeLike({ token: getToken(), postId })
          .then(() => {
            posts[index].isLiked = false;
          })
          .then(() => {
            getPosts({ token: getToken(), userId }).then((response) => {
              if (page === USER_POSTS_PAGE) {
                updatePosts(response);
                goToPage(USER_POSTS_PAGE, {
                  userId,
                });
              } else {
                updatePosts(response);
                renderApp();
              }
            });
          });
      } else {
        addLike({ token: getToken(), postId })
          .then(() => {
            posts[index].isLiked = true;
          })
          .then(() => {
            getPosts({ token: getToken(), userId }).then((response) => {
              if (page === USER_POSTS_PAGE) {
                updatePosts(response);
                goToPage(USER_POSTS_PAGE, {
                  userId,
                });
              } else {
                updatePosts(response);
                renderApp();
              }
            });
          });
      }
    });
  });
}
export function postDeleteEventListener() {
  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const postId = deleteButton.dataset.postId;
      const postElement = deleteButton.closest(".post");
      if (postElement) {
        const userId = postElement.querySelector(".post-header").dataset.userId;

        postDelete({ token: getToken(), postId }).then(() => {
          getPosts({ token: getToken(), userId }).then((response) => {
            if (page === USER_POSTS_PAGE) {
              updatePosts(response);
              goToPage(USER_POSTS_PAGE, {
                userId,
              });
            } else {
              updatePosts(response);
              renderApp();
            }
          });
        });
      }
    });
  });
}
