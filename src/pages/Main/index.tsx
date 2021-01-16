import React, { useState, useEffect, FormEvent } from 'react';
import ReactDOM from 'react-dom';
import { Content, Footer, Toolbar } from '../../styles/globals';
import { Button, Column, Container, FloatingButtom, Label, Row } from './styles';
import { GoHome } from "react-icons/go";
import { IconContext } from 'react-icons/lib';
import { BsCardList } from "react-icons/bs";
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import api from '../../services/api';
import { Form } from '@unform/web';
import Input from './components';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useRef } from 'react';
import { useCallback } from 'react';
import { ValidationError } from 'yup';

// typagem da API
interface userApiData {
  name: {
    first: String,
    last: String,
  },
  email: String,
  login: {
    username: String,
    password: String,
  },
  location: {
    street: String,
    city: String,
    state: String,
    coordinates: {
      latitude: String,
      longitude: String,
    }
  }
};



interface Errors {
  [key: string]: string;
}

function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}



const Main: React.FC = () => {
  //
  const [loginIndex, setLoginIndex] = useState(0);
  const [userDatas, setUserDatas] = useState<userApiData[]>((): userApiData[] => {
    return [];
  })
  const history = useHistory();


  //Função responsável pela exportação do arquivo JSON
  const handleSaveToPC = () => {
    const fileData = JSON.stringify(userDatas);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'filename.json';
    link.href = url;
    link.click();
  }

  //dados iniciais da aplicação
  useEffect(() => {
    //Extração dos dados iniciais, via API
    async function handleAddUserDatas(/*e: FormEvent<HTMLFormElement>*/): Promise<void> {
      try {
        const response = await api.get<any>(`https://randomuser.me/api`);
        const userData: userApiData = await response.data.results[0];
        await setUserDatas([...userDatas, userData]);
      } catch (err) {
        alert("deu erro!" + err)
      }
    };
    handleAddUserDatas();
  }, []);


  const formRef = useRef<FormHandles>(null);
  //inserção de dados via formulário
  async function HandleAddUserDatas(data: any) {
    //constantes
    const checkIfExists: userApiData[] = userDatas.filter(item => (item.login.username === data.login.username))

    //Verifica se o "checkIfExists" contém alguma informação.
    //se sim, ele emite um alerta, e não permite o cadastro


    //** falta limpar os dados dos inputs após o submit 



    try {
      // formRef.current?.setErrors(errors);
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        login: Yup.object({
          username: Yup.string().required('Nome obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        }),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),

        name: Yup.object({
          first: Yup.string().required('Nome obrigatório'),
          last: Yup.string().required('Sobrenome obrigatório'),
        }),
        location: Yup.object({
          street: Yup.string().required('Endereço obrigatório')
        }),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      if (!!checkIfExists[0]?.login.username) {
        alert("User already exist ")
      }
      else {
        setUserDatas([...userDatas, data]);
        alert("Dados cadastrados:")
        formRef.current?.reset();

      };
      alert("ok")
    } catch (error) {


      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);
        console.log(error)

        return;
      }
    }

  }




  function HandleUserFetch(data: any) {
    // const searches =[data];

    const checkIfExists = userDatas.filter(item => (item.login.username === data.username) && (item.login.password === data.password));

    if (checkIfExists.length > 0) {
      console.log("indexOf: " + userDatas.indexOf(checkIfExists[0]));
      setLoginIndex(userDatas.indexOf(checkIfExists[0]));
      alert("Os dados batem")
    } else {
      alert("Os dados não batem")
      //** falta limpar os campos abaixo, para que o usuário não se confunda, associando os dados do formulário de Fetch com os dados do container
      //** falta limpar os dados dos inputs após o submit 
    }

  }

  return (
    <>
      <Popup on="click" trigger={

        <FloatingButtom style={{ right: "0px", top: "170px", }}  >
          <Popup on="hover" trigger={<div ><BsCardList style={{ height: "32px", width: "32px", display: "flex", justifyContent: "space-around", margin: "8px" }} /></div>} position="top right"  >
            registered users
          </Popup>
        </FloatingButtom>} position="left top">

        <Container style={{ overflow: "scroll", maxHeight: "320px", flexDirection: "column", backgroundColor: "white" }} >
          <Column style={{ minWidth: '300px', justifyContent: "space-around" }}>
            <Row style={{ justifyContent: "space-around" }}>

              <Column >
                <h1>Users</h1>
                {<div>{userDatas.length > 0 && userDatas.map((value, index) => { return <div key={index} >{value.login.username}</div> })}</div>}
              </Column>

              <Column>
                <h1>Passwords</h1>
                {<div>{userDatas.length > 0 && userDatas.map((value, index) => { return <div key={index} >{value.login.password}</div> })}</div>}
              </Column>

            </Row>
          </Column>
        </Container>

      </Popup>

      <Toolbar id={'Toolbar'}>
        <IconContext.Provider value={{ size: '48px' }} >
          <div><GoHome onClick={() => { return history.push('/') }} style={{ margin: "16px", cursor: "pointer" }} height={'48px'} /></div>
        </IconContext.Provider>
        <h1>Basic test</h1>
        <div><img height={"64px"} src="https://icons-for-free.com/iconfiles/png/512/logo+twitter+twitter+logo+icon-1320190502069263658.png" alt="" /></div>
      </Toolbar>


      <div style={{ minHeight: "1080px", width: '100%', justifyItems: "center", justifyContent: "center", display: 'flex' }} >
        <Content style={{ marginTop: "0px", marginBottom: "0px" }}>
          <div style={{ width: '100%', height: "100%", flexDirection: "row", display: "flex", justifyContent: "space-around" }}>
            <Container style={{ minWidth: '40%', maxWidth: '100%' }}  >
              <Column style={{ minWidth: '40%', maxWidth: '100%' }}>
                <h1>Please, connect</h1>
                <h2>to see all your datas.</h2>
                <p style={{ marginTop: "16px", marginBottom: "16px" }}>Please, insert your username and your password:</p>

                <Form onSubmit={HandleUserFetch}>
                  <Row style={{ flexWrap: "wrap" }} >
                    <Column style={{ width: '50%', minWidth: "150px", padding: "2.5px" }}>
                      <Label>username</Label>

                      <Input name="username" style={{ minWidth: '40%', maxWidth: '100%' }} />
                    </Column>
                    <Column style={{ width: '50%', minWidth: "150px", padding: "2.5px" }}>
                      <Label>password</Label>
                      <Input name="password" type="password" />
                    </Column>
                  </Row>
                  <Button style={{ width: "72px", height: "32px", marginTop: "8px", marginBottom: "16px" }}>Fetch</Button>
                </Form>

                <Column >
                  <Container style={{ margin: "0px", marginTop: "10px" }}>
                    <Column style={{ width: "100%", margin: "0px", padding: "0px" }}>

                      <Row style={{ width: "100%", flexWrap: "wrap" }}>

                        <Column style={{ width: '50%', minWidth: "150px", padding: "2.5px" }} >
                          <div style={{ marginLeft: "15px" }}>username</div>
                          <Container style={{ width: "85%" }} >
                            {userDatas[loginIndex] && userDatas[loginIndex].login.username}

                          </Container>
                        </Column>

                        <Column style={{ width: '50%', minWidth: "150px", padding: "2.5px" }} >
                          <div style={{ marginLeft: "15px" }}>password</div>
                          <Container style={{ width: "85%" }} >
                            {userDatas[loginIndex] && userDatas[loginIndex].login.password}
                          </Container>
                        </Column>

                      </Row>

                      <Row style={{ width: "100%", flexWrap: "wrap", }}>

                        <Column style={{ width: '50%', minWidth: "150px", padding: "2.5px" }} >
                          <div style={{ marginLeft: "15px" }}>firsh name</div>
                          <Container style={{ width: "85%" }} >
                            {userDatas[loginIndex] && userDatas[loginIndex].name.first}
                          </Container>
                        </Column>

                        <Column style={{ width: '50%', minWidth: "150px", padding: "2.5px" }}>
                          <div style={{ marginLeft: "15px" }}>last name</div>
                          <Container style={{ width: "85%" }}>
                            {userDatas[loginIndex] && userDatas[loginIndex].name.last}
                          </Container>
                        </Column>

                      </Row>

                      <Column style={{ width: "100%" }} >
                        <div style={{ marginLeft: "15px" }}>email</div>
                        <Container style={{ overflow: "clip", textOverflow: "ellipsis", whiteSpace: "nowrap", }} >
                          {userDatas[loginIndex] && userDatas[loginIndex].email}
                        </Container>
                      </Column>

                      <Column style={{ width: "100%" }} >
                        <div style={{ marginLeft: "15px" }}>street</div>
                        <Container style={{ width: "92.5%" }} >
                          {userDatas[loginIndex] && userDatas[loginIndex].location.city}
                        </Container>
                      </Column>

                      <Button onClick={handleSaveToPC} >Download JSON</Button>


                    </Column>

                  </Container>
                </Column>
              </Column>
            </Container>
            
            <Container style={{ minWidth: '40%', maxWidth: '100%' }} >

              <Form onSubmit={HandleAddUserDatas} ref={formRef} style={{ minWidth: '40%', maxWidth: '100%' }}>
                <h1>Hello, Everyone.</h1>
                <h2>Welcome to Formulário!</h2>
                <p style={{ marginTop: "16px", marginBottom: "16px" }}>Please, insert your datas below:</p>
                <Column style={{ maxWidth: '100%' }}>
                  <Row style={{ flexWrap: "wrap" }} >
                    <Column style={{ width: '50%', minWidth: "150px", padding: "2.5px" }}>
                      <Label>username</Label>
                      <Input name="login.username" />
                    </Column>
                    <Column style={{ width: '50%', minWidth: "150px", padding: "2.5px" }}>
                      <Label>password</Label>
                      <Input name="login.password" type="password" />
                    </Column>
                  </Row>
                  <Label style={{ marginLeft: "2.5px" }}>e-mail</Label>
                  <Input name="email" type="email" />
                  <Row style={{ flexWrap: "wrap" }}>
                    <Column style={{ width: '50%', minWidth: "150px", padding: "2.5px" }}>
                      <Label>first name</Label>
                      <Input name="name.first" />
                    </Column>
                    <Column style={{ width: '50%', minWidth: "150px", padding: "2.5px" }}>
                      <Label>last name</Label>
                      <Input name="name.last" />
                    </Column>
                  </Row>
                  <Label>address</Label>
                  <Input name="location.street" type="address" />
                  <Button type="submit" onClick={() => HandleAddUserDatas} style={{ width: "72px", height: "32px", marginTop: "8px", marginBottom: "16px" }}>Submit</Button>

                </Column>

              </Form>
            </Container>
          </div>
        </Content>
      </div>

      <Footer>
        <div>sdfs</div>
        <div>sdfs</div>
        <div>sdfs</div>
        <div>sdfs</div>
      </Footer>
    </>
  )
};

export default Main;
