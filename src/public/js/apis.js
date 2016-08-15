
angular.module('lichu').factory('apis', function(){
  return {
    login:{
      url:"/users/login",
      method:"post"
    },
    getBooks:{
      url:"/books",
      method:"get"
    },
    uploadBook:{
      url:"/books/upload",
      method:"post"
    },
    getDetailBookbyId:{
      url:"/books/{id}",
      method:"get"
    }
  }
});
