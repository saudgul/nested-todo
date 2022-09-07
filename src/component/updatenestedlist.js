import React, { useState,useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
 export const Edit=({modal,toggle,update,data})=>{
    
    console.log("edit data",data)
    const [inputList, setInputList] = useState([{ data: "" }]);
   
    const [title, settitle] = useState('');
    console.log("input list",inputList)
    
    useEffect(() => {
        settitle(data.title)
        setInputList(data.taskdata)
       
    }, [data])
    console.log("title",title)
    console.log("task data",inputList)
   
   
   
    const handlechange = (e) => {
        settitle(e.target.value);



    }
    const  handleupdate = (e) => {
        e.preventDefault()
        let dataObj = {

        }
        dataObj["title"] = title
        dataObj["taskdata"] = [...inputList]
        console.log("data u obj",dataObj)
        update(dataObj)
        toggle(false) 
    }
    
   


    const handleInputChange = (e, index) => {
        e.preventDefault()
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);

    };
    const handleRemoveClick = (e,idx) => {
        console.log("id",idx)
        e.preventDefault()
        const list = [...inputList];
        list.splice(idx, 1);
        setInputList(list);


    };

    // handle click event of the Add button
    const handleAddClick = (e) => {
        e.preventDefault()
        setInputList([...inputList, { data: "" }]);
        console.log(inputList)
    };
    console.log("title",title)
    console.log("input list",inputList)
    return (
       
       
        <Modal isOpen={modal} toggle={toggle}>
        <form onSubmit={ handleupdate}>
            <ModalHeader toggle={toggle}>Update Data</ModalHeader>
            <ModalBody>
                
            <div >
                
                    <div className="form-group">

                        <input type="text" name="title" value={title} className="form-control"  onChange={e=>handlechange(e)} required />
                    </div>
                
            </div>
          

             {inputList && inputList .length>0 && inputList .map((temp, i) => {
                return (
                    <>

                        <div className="box d-flex">
                            <input
                                name="data"
                                placeholder="task"
                                value={temp.data}
                                className="form-control"
                                onChange={e => handleInputChange(e, i)}
                                required
                            />


                            {inputList.length !== 1 &&
                                <button
                                    className="ml"
                                    onClick={e => handleRemoveClick(e,i)}><i className="fas fa-minus-circle"></i></button>}

                            {inputList.length - 1 === i && <button onClick={handleAddClick}><span><i className="fas fa-plus-circle"></i></span></button>}

                        </div>
                        <div>

                        </div>
                    </>
                );
            })} 
           {/* <div>
                <button className="btnm" onClick={handleupdate}>
                    update data</button></div> */}
  
                
            </ModalBody>
            { <ModalFooter>
            
            <Button color="primary" type="submit ">Update</Button>{' '}
             {/* <Button color="primary"  className="btnm"  onClick={handleupdate}>Update</Button>{' '} */}
            <Button color="secondary"  className="btnm"  onClick={toggle}>Cancel</Button>
            </ModalFooter> }
            
            </form>   
            
      </Modal>
      
       

    );

}