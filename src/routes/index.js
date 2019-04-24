import Login from '../Login/Login';
import AddPost from '../AddPost/AddPost';
import ListPosts from '../ListPosts/ListPosts';
import EditPost from '../EditPost/EditPost';
import PostDetail from '../PostDetail/PostDetail';

export const nonPrivateRoute = [{
    path: "/",
    name: "login",
    component: Login
}]

export const protectedRoute = [{
    path: "/addpost",
    name: "addpost",
    component: AddPost
},
{
    path: "/listposts",
    name: "listposts",
    component: ListPosts
},
{
    path: "/editpost",
    name: "editpost",
    component: EditPost
},
{
    path: "/postdetail",
    name: "postdetail",
    component: PostDetail
}]