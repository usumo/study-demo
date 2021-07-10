//定义装饰器工厂
 
function logClass1(params:string){
  return function(target:any){
      console.log('类装饰器1');
  }
}

function logClass2(params:string){
  return function(target:any){
      console.log('类装饰器2');
  }
}

//属性装饰器
function logProperty(params?:any){

      return function(target:any,attr:any){
          console.log('属性装饰器');
      } 
  }


//方法装饰器
function logmethod(params:any){
  return function(target:any,methodName:any,desc:any){
    console.log('方法装饰器');
  }
}

//方法参数装饰器
function logparams1(params: any){

    return function(target:any,paramsName:any,paamsIndex:any){
        console.log('方法参数装饰器1');
     }
}

function logparams2(params:any){

    return function(target:any,paramsName:any,paamsIndex:any){
        console.log('方法参数装饰器2');
     }
}


@logClass1("www.baidu.com")
@logClass2("www.IMOOC.com")
class HttpClient{
 @logProperty()//可以不传参
 public apiUrl:string | undefined;
  constructor(){
    
  }
  @logmethod('www.baidu.com')
  getData(){
    console.log(this.apiUrl);
  }
  setData(){
    console.log(this.apiUrl);
  }

}


var  http:any = new HttpClient();
http.getData(123456);
