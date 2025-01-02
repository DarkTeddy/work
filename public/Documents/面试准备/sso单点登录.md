
SSO单点登录是如何实现的？

假如一个公司内同时有两个域名A和B
在访问A的时候，发现用户没有登录，会重定向到sso.XXX.com?origin=A，用户此时需要扫码登录
登录后，sso返回一个token，同时重定向到origin，此时会带上token去访问A，A用token再去
sso服务器验证是否正确，如果正确就直接
