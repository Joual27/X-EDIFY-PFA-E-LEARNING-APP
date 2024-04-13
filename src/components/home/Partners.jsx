
import google from '../../assets/google.png'
import microsoft from '../../assets/microsoft.png'
import cambridge from '../../assets/cambridge.png'
import oxford from '../../assets/oxford.png'
import openstax from '../../assets/openstax.png'
import stanford from '../../assets/stanford.png'
import ibm from '../../assets/ibm.png'
import x from '../../assets/X.png'


export default function Partners(){

    return(
        <div className='flex flex-col py-[4rem] gap-[3rem]'>
           <div>
               <p className='text-center font-medium text-xl lg:text-2xl'>Learn From The Leaders Of Tech ...</p>
           </div>
            <div className='flex-wrap mx-auto flex justify-center items-center gap-[20px] lg:gap-[40px]' >
                <img src={google} className='w-[80px] h-[50px] lg:w-[100px] lg:h-[60px] mt-[0.5rem]' alt=""/>
                <img src={microsoft} className='w-[90px] h-[50px] lg:w-[150px] lg:h-[60px]' alt=""/>
                <img src={ibm} className='w-[80px] h-[50px] lg:w-[150px] lg:h-[60px]' alt=""/>
                <img src={x} className='w-[80px] h-[50px] lg:w-[120px] lg:h-[60px]' alt=""/>
                <img src={stanford} className='w-[80px] h-[50px] lg:w-[100px] lg:h-[60px]' alt=""/>
                <img src={cambridge} className='w-[90px] h-[50px] lg:w-[150px] lg:h-[60px]' alt=""/>
                <img src={openstax} className='w-[80px] h-[50px] lg:w-[120px] lg:h-[60px]' alt=""/>
                <img src={oxford} className='w-[80px] h-[60px] lg:w-[100px] lg:h-[80px]' alt=""/>
            </div>
        </div>
    )

}
