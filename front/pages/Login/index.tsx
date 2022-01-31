import React, { useCallback, useState, useEffect } from 'react';
import useSWR from 'swr';
import { Button, Error, Form, Header, Input, Label, LinkContainer, Success } from '../Signup/styles';
import useInput from '@hooks/useInput';
import { login } from '@utils/apis';
import { Link } from 'react-router-dom';
import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';

const MSG = {
  LOGIN_SUCCESS: '로그인되었습니다!',
  EMPTY: '모든 값을 입력해주세요.',
};

const Login = () => {
  const { data, error, revalidate } = useSWR<IUser | false>('users', fetcher);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setErrorMsg('');
      if (!email || !password) return setErrorMsg(MSG.EMPTY);
      const res = (await login({ email, password })) as string;
      res === 'ok' ? revalidate() : setErrorMsg(res);
    },
    [email, password],
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
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        {Boolean(errorMsg) && <Error>{errorMsg}</Error>}
        {loginSuccess && <Success>{MSG.LOGIN_SUCCESS}</Success>}
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;
