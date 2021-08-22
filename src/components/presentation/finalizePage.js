import React from "react";
import ResumePreview from './resumePreview'
import  jsPDF  from "jspdf";
import html2canvas from 'html2canvas';
import {connect} from 'react-redux';
import {useFirestore} from 'react-redux-firebase'
import { Box, Button } from "@chakra-ui/react";
   function Finalize(props) {
     const firestore = useFirestore();
    let educationSection= props.educationSection
    let contactSection=props.contactSection
    let documentd=props.document
  
    const saveToDatabase= async()=>{
     let user = await firestore.collection('users').doc(props.auth.uid).get();
     user = user.data();
     let newObj = null;
     if(user.resumeIds !== undefined)
     {
       newObj = {...user.resumeIds,[documentd.id]:{educationSection:educationSection,contactSection:contactSection,document:documentd}}
     }
     else{
       newObj={[documentd.id]:{educationSection:educationSection,contactSection:contactSection,document:documentd}}
     }
     await firestore.collection('users').doc(props.auth.uid).update({
       resumeIds:newObj
     })
    }
     const downloadResume=()=> {
    
       const input = document.getElementById('resumePreview');
      console.log(document)
       html2canvas(input)
         .then((canvas) => {
           const imgData = canvas.toDataURL('image/png');
           const pdf = new jsPDF("p", "mm", "a4");
           var width = pdf.internal.pageSize.getWidth();
           var height = pdf.internal.pageSize.getHeight();
           pdf.addImage(imgData, 'JPEG', 0, 0,width,height);
           // pdf.output('dataurlnewwindow');
           pdf.save("resume.pdf");
         }).catch(function(error){
           console.log(error)
         })
     }
    return (
      <Box p="16" h="100vh">

      <div className="funnel-section ">
          <div className="finalize-preview-card " id="resumePreview">
            <ResumePreview contactSection={contactSection} educationSection={educationSection} skinCd={props?.document?.skinCd}></ResumePreview>   
          </div>
          <div className="finalize-settings center">            

             
              <div className=" download-resume resume-options">
                <p className="no-margin"  >
                  Download Resume As PdF
                </p>
                    <Button my="4" size="lg" style={{cursor:'pointer'}}  onClick={downloadResume} colorScheme="teal" fontSize="4xl" p="3rem">Download Resume</Button>
             </div>
             <div className=" download-resume resume-options">
                <p className="no-margin"  >
                 Save to Database
                </p>
                    <Button my="4" size="lg" style={{cursor:'pointer'}}  onClick={saveToDatabase} colorScheme="teal" fontSize="4xl" p="3rem">Save to Database</Button>
             </div>
    </div>
    </div>
      </Box>
   
    )

    
}
const mapStateToProps = state=>{
  return {
    contactSection:state.contactSection,
    educationSection:state.educationSection,
    document:state.document,
    auth:state.firebase.auth
  }
}


export default connect(mapStateToProps,null)(Finalize)
