import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

function App() {
  const [data, setData] = useState([]);
  const [state, setState] = useState('');
  const [edit, setEdit] = useState('');

  const handleChange = (e) => {
    setState(e.target.value)
  }

  const handleClick = (e) => {
    if (state == '') {
      return false;
    }
    if(edit != ''){
      console.log('edit')
      let arrs = [];
      let map = data.map((item, index) => {
        console.log('map', item)
        if(item.id == edit){
          item.name = state
        }
        arrs.push(item);
      })

      arrs.filter((it) => it?.id !== edit)
      console.log('data', arrs)
      setData(arrs);
    } else{
      e.preventDefault()
      let st = {
        "id": Math.random(),
        "name": state,
      };
  
      setData([...data, st]);
      console.log(data, state, e);
    }

    setEdit('')
    setState('')
  }

  const handleReset = () => {
    setData([]);
    setState('')
  }

  const fetchData = async () => {
      const response = await fetch('data.json');
      const json = await response.json();
      setData(json);
  }

  const handleEdit = (e) => {
    console.log(e?.name)
    setState(e?.name)
    setEdit(e?.id)
  }

  const handleDelete = (value) => {
    console.log(value)
    const datas = data.filter((item) => item.id !== value.id);
    setData(datas);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div className='flex flex-row justify-center'>
        <div className='space-y-2'>
          <h1 className='text-center'>HALLO</h1>
          <div className='flex flex-col gap-2'>
            <input type="hidden" value={edit} className='border' />
            <input onChange={handleChange} value={state ?? ''} type="text" className='p-2 border-2 border-blue-400 bg-slate-100 rounded-md w-[300px]' placeholder='Masukan Name' />
            <div className='flex flex-row gap-3'>
              <button onClick={handleReset} type='button' className='bg-red-400 p-2 text-white font-normal rounded-md w-full'>RESET</button>
              <button onClick={handleClick} type='button' className='bg-blue-400 p-2 text-white font-normal rounded-md w-full'>SAVE</button>
            </div>
          </div>

          <div>
              {data?.map((item, index) => (
                <div  key={index} className='flex flex-row items-center'>
                  <div className='w-full p-1 border-2 rounded-md cursor-pointer border-slate-100 text-white bg-red-400 text-normal'>{item?.name}</div>
                  <div className='flex gap-1'>
                    <div className='p-2 bg-red-300 rounded-md cursor-pointer'>
                      <BsFillTrashFill onClick={() => handleDelete(item)} className='text-white'/>   
                    </div>
                    <div className='p-2 bg-blue-400 rounded-md cursor-pointer'>
                      <BsFillPencilFill onClick={() =>handleEdit(item)} className='text-white'/>   
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
