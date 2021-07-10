//定义装饰器工厂
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function logClass1(params) {
    return function (target) {
        console.log('类装饰器1');
    };
}
function logClass2(params) {
    return function (target) {
        console.log('类装饰器2');
    };
}
//属性装饰器
function logProperty(params) {
    return function (target, attr) {
        console.log('属性装饰器');
    };
}
//方法装饰器
function logmethod(params) {
    return function (target, methodName, desc) {
        console.log('方法装饰器');
    };
}
//方法参数装饰器
function logparams1(params) {
    return function (target, paramsName, paamsIndex) {
        console.log('方法参数装饰器1');
    };
}
function logparams2(params) {
    return function (target, paramsName, paamsIndex) {
        console.log('方法参数装饰器2');
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
        console.log(this.apiUrl);
    };
    HttpClient.prototype.setData = function () {
        console.log(this.apiUrl);
    };
    __decorate([
        logProperty() //可以不传参
    ], HttpClient.prototype, "apiUrl");
    __decorate([
        logmethod('www.baidu.com')
    ], HttpClient.prototype, "getData");
    HttpClient = __decorate([
        logClass1("www.baidu.com"),
        logClass2("www.IMOOC.com")
    ], HttpClient);
    return HttpClient;
}());
var http = new HttpClient();
http.getData(123456);
