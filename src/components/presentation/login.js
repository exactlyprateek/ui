/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from "react";
// import update from 'immutability-helper';
import { connect } from "react-redux";
// import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import { isLoaded } from 'react-redux-firebase'
import { useHistory } from "react-router";
import { Box, Button, Center, Text } from "@chakra-ui/react";

  function Login(props) {
    console.log(props);
    let history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    useEffect(() => {
      if(props.authFirebase.uid){
        history.push('/')
      }
    }, [props])
const handleEmail= (e)=>{
setEmail(e.target.value);
}
const handlePassword=(e)=>{
  setPassword(e.target.value);
}
    const onSubmit=()=>{
    
      let obj = {email:email,password:password}
      console.log(obj)
      props.signIn(obj)
    }


    return (
      <React.Fragment>
      {!isLoaded(props.authFirebase)?null:
      <React.Fragment>
      {props.authMine?.loading?<h4 style={{marginTop:'10%',height:'52vh'}}>Patiently Wait...we are logging you in</h4>:
          <Center>

          <Box boxShadow="lg" rounded="xl" border="1px" borderColor="blackAlpha.400" py="32" my="64">
                <div className="">
                    <h2 className="form-heading center">Enter Login details</h2>
                    <div className="form-section">
                        <div className="input-group full"><label>Email</label>
                            <div className="effect"><input type="text" name="email" value={email || ''}  onChange={handleEmail}  /><span></span>
                            </div>
                        </div>

                        <div className="input-group full"><label>Password</label>
                            <div className="effect"><input  type="password" name="password"  value={password || ''} onChange={handlePassword}/><span></span>
                            </div>
                        </div>
                        {props.authMine?.ErrorMessage?.message?<div className="input-group full">
                                <span className="error-message" >{props.authMine?.ErrorMessage?.message}</span> 
                        </div> :<></>}  
                        <div className="form-buttons">
                            <Button py="12" onClick={onSubmit} variant={"solid"} size="lg" w="100%" colorScheme="teal">
                              <Text fontSize="3xl">

                              Login
                              </Text>
                              </Button>
                        </div>
                    </div>
                </div>
</Box>
  </Center>
  }
  </React.Fragment>
  }
        </React.Fragment>


);
}

const mapStateToProps =(state)=>{
  return{
    authMine:state.auth,
    authFirebase:state.firebase.auth
  }
}
const mapDispatchToProps = dispatch=>{
  return{
  signIn:(userData)=>dispatch(authActions.signIn(userData))
  }
}

 


  export default  connect(mapStateToProps,mapDispatchToProps)(Login)