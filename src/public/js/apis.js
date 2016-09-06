
angular.module('lichu').factory('apis', function(){
  return {
    login:{
      url:"/users/login",
      method:"post"
    },
    logout:{
      url:'/users/logout',
      method:"get"
    },
    register:{
      url:"/users/register",
      method:"post"
    },
    getBooks:{
      url:"/books",
      method:"post"
    },
    uploadBook:{
      url:"/books/upload",
      method:"post"
    },
    getDetailBookbyId:{
      url:"/books/{id}",
      method:"get"
    }
  };
});
