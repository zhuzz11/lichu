myApp

.factory('$apis', function(){
  return {
    login:{
      url:"/login",
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
})


;
