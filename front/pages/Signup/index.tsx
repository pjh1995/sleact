import React, { useCallback, useState, useEffect } from 'react';
import { Button, Error, Form, Header, Input, Label, LinkContainer, Success } from './styles';
import useInput from '@hooks/useInput';
import { signUp } from '@utils/apis';
import { Link } from 'react-router-dom';

const MSG = {
  MISMATCH: '비밀번호가 일치하지 않습니다.',
  SIGNUP_SUCCESS: '회원가입되었습니다! 로그인해주세요.',
  EMPTY: '모든 값을 입력해주세요.',
};

const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setErrorMsg(e.target.value === password ? '' : MSG.MISMATCH);
    },
    [password],
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSignupSuccess(false);
      const checkList = [nickname, email, password, passwordCheck];
      const isEmpty = checkList.some((v) => v == '');
      if (isEmpty) return setErrorMsg(MSG.EMPTY);
      if (!Boolean(errorMsg)) {
        const res = (await signUp({ email, password, nickname })) as string;
        res === 'ok' ? setSignupSuccess(true) : setErrorMsg(res);
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
        </Label>
        {Boolean(errorMsg) && <Error>{errorMsg}</Error>}
        {Boolean(signupSuccess) && <Success>{MSG.SIGNUP_SUCCESS}</Success>}
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
