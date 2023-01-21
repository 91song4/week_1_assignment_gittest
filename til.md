#윈도우에서 맥북의 MYSQL 사용하기.

```cmd
// 맥 환경설정/공유/원격로그인 에 적혀있는 정보 이용
ssh 맥사용자이름@맥 아이피 주소

// 접속 후
//전역으로 mysql 사용할수있게 경로 설정
export PATH=${PATH}:/usr/local/mysql/bin/;

mysql -uroot -p
password: mysql비밀번호
```

ssh 접속 끊기
```cmd
// ctrl + D 
```
***
node에서 db연결 시 에러 발생
1. Host 'HOST이름' is not allowed to connect to this MySQL server  
사용자가 DB접근권한이 없어서 발생하는 에러.
2. Client does not support authentication protocol requested by server; consider upgrading MySQL client  
문제 원인
    > Node.js에서 mysql모듈이 아직 caching_sha2_password 방식을 지원하지 못해서 생긴 에러이다.  

    caching_sh2_password ?? 그게머임??

    > 과거의 MySQL의 **drfault_authentication_plugin**(기본 인증 플러그인)은 mysql_native_password 이었다.  
    > MySQL 8부터 기본 인증 플러그인은 보안이 강화된 caching_sha2_password로 변경되었다.  

    문제 해결 방안
    1. caching_sha2_password 방식을 지원하는 mysql2 모듈을 사용한다.
    2. 기본 인증 플러그인을 mysql_native_password로 다운그레이드 한다.  

    1번 방식의 문제해결이 보안상 권장하는 해결책이라고 한다.  
    그러나 이 참조페이지에서는 2번 방식을 소개하고 있기에 나도 2번 해결방식으로 해결해보았다.

    ```mysql
    // Node에서 사용할 사용자 생성
    create user '유저명'@'localhost' identified by '비밀번호';
    
    // 생성한 사용자의 권한 적용
    GRANT ALL PRIVILEGES ON *.* TO '유저명'@'localhost'; 
    GRANT GRANT OPTION ON *.* TO '유저명'@'localhost'; 

    // 현재 생성된 사용자 정보를 보면 기본 인증 플러그인은 caching_sha2_password 이다.
    SELECT user,authentication_string,plugin,host FROM mysql.user; 

    // 사용자 기본 인증 플러그인을 mysql_native_password로 다운그레이드
    ALTER user '유저명'@'localhost' IDENTIFIED WITH mysql_native_password by '비밀번호';

    // MySQL에 실시간 반영
    flush privileges;
    ```