import React,{useState,useEffect} from "react";
import { isLoaded } from 'react-redux-firebase'
import { connect } from "react-redux";
import * as authActions from '../../actions/authActions';
import { useHistory } from "react-router";
import { Box, Button, Center, Text } from "@chakra-ui/react";
  function Register(props) {
 
    let history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const handleEmail= (e)=>{
      setEmail(e.target.value);
      }
      const handlePassword=(e)=>{
        setPassword(e.target.value);
      }
      useEffect(()=>{
        if(props.auth?.uid)
        {
          history.push('/')
        }
      },[history, props])
   
  const onSubmit=()=>{
     props.register({email:email, password:password})
  }

 
    return (
      <React.Fragment>
      {!isLoaded(props.auth)?null:<React.Fragment>
        {props.authMine.loading?<h4 style={{marginTop:'10%',height:'52vh'}}>Patiently Wait...we are resgistering you in</h4>:
          <Center>

        <Box minW={["100%","90%","40rem","50rem","60rem"]} boxShadow="lg" rounded="xl" border="1px" borderColor="blackAlpha.400" py="32" my="64">

                <div className="">
               
                    <h2 className="form-heading center">Enter your details</h2>
                    <div className="form-section">
                        <div className="input-group full"><label>Email</label>
                            <div className="effect"><input type="text" name="email" value={email||''}  onChange={handleEmail}  /><span></span>
                            </div>
                        </div>

                        <div className="input-group full"><label>Password</label>
                            <div className="effect"><input  type="password" name="password"  value={password||''} onChange={handlePassword}/><span></span>
                            </div>
                        </div>
                        {props.authMine?.ErrorMessage?.message?<div className="input-group full">
                                <span className="error-message" >{props.authMine?.ErrorMessage?.message}</span> 
                        </div> :<></>}
                        <div className="form-buttons">
                        <Button py="12" onClick={onSubmit} variant={"solid"} size="lg" w="100%" colorScheme="teal">
                              <Text fontSize="3xl">

                              Register
                              </Text>
                              </Button>
                            {/* <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'></button> */}
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

const mapStateToProps = (state)=>{
  return {
    auth:state.firebase.auth,
    authMine:state.auth
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    register:(userData)=>dispatch(authActions.register(userData))
  }
}


  export default connect(mapStateToProps,mapDispatchToProps)(Register)