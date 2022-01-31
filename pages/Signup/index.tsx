import React, { useCallback, useState } from 'react';
import { Button, Error, Form, Header, Input, Label, LinkContainer, Success } from './styles';
import useInput from '@hooks/useInput';
import { signUp } from '@apis';
const ERROR_MSG = {
  MISMATCH: '비밀번호가 일치하지 않습니다.',
  SIGNUP_SUCCESS: '회원가입되었습니다! 로그인해주세요.',
  SIGNUP_ERROR: '이미 가입된 이메일입니다.',
  EMPTY: '모든 값을 입력해주세요.',
};
const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setErrorMsg(e.target.value === password ? '' : ERROR_MSG.MISMATCH);
    },
    [password],
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const checkList = [nickname, email, password, passwordCheck];
      const isEmpty = checkList.some((v) => v == '');
      if (isEmpty) return setErrorMsg(ERROR_MSG.EMPTY);
      if (!Boolean(errorMsg)) {
        const a = signUp({ email, password, nickname });
        console.log('submit', a);
      }
      console.log({ nickname, email, password, passwordCheck, errorMsg });
    },
    [nickname, email, password, passwordCheck],
  );
  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {Boolean(errorMsg) && <Error>{errorMsg}</Error>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <a href="/login">로그인 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
