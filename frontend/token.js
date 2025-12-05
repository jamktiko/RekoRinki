import * as jwtDecode from 'jwt-decode';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAamFtay5maSIsInR1b3R0YWphIjpmYWxzZSwiaWF0IjoxNzY0OTMzMjc1LCJleHAiOjE3NjQ5NDc2NzV9.lBKvF4GynJgo3O-oC5b3XiFpopgYh-RORNiYUaM5SoQ';

const payload = jwtDecode.jwtDecode(token);

console.log(payload);
