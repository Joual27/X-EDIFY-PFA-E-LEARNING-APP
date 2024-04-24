import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {useContext, useState} from "react";
import {PublicCoursesContext} from "../../pages/AllCourses.jsx";


const Filters = () => {
    const {setSearchTerm,topCategories,fetchCoursesOfCategory,fetchCourses} = useContext(PublicCoursesContext);
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }


    const handleCategoryFilterClick = (e) => {
        let category_id = e.currentTarget.dataset.id;
        if (category_id === 'all'){
            fetchCourses()
        }
        else{
            fetchCoursesOfCategory(category_id);
        }
    }

    return(
        <div className='w-full'>
            <div className='py-[3rem]'>
                <p className='text-center text-2xl font-semibold underline'>Available Courses</p>
            </div>
            <div className='w-[80%] ml-[12.5%] flex items-center justify-center gap-[1.5rem]'>

                <div className=''>
                    <div className="relative">
                        <FontAwesomeIcon icon={faSearch} className="absolute fa fa-search text-gray top-3 left-4"/>
                        <input type="text"
                               onKeyUp={handleSearchTermChange}
                               className="bg-dark py-[0.6rem] w-full px-12 rounded-lg focus:outline-none font-medium text-[0.9rem] placeholder:text-main placeholder:text-[0.8rem] placeholder:text-center"
                               placeholder='Search by course or category'
                               name="search"/>
                    </div>
                </div>
                <div className='w-[2px] h-[35px] bg-main'></div>
                <div>
                    <p className='text-[0.9rem] font-medium'>Filter BY Our Popular Categories Or Enter Your Keyword :</p>
                </div>
                <div className='w-[2px] h-[35px] bg-main'></div>
                <div className='flex gap-[2rem] justify-center items-center'>
                    <div
                        onClick={handleCategoryFilterClick}
                        data-id='all'
                        className='flex items-center justify-center py-[0.35rem] px-[1rem] text-white font-medium rounded-md bg-hovers cursor-pointer hover:bg-secHovers'>
                        <p>All</p>
                    </div>
                    {
                        topCategories.map(category => (
                            <div
                                key={category.id}
                                onClick={handleCategoryFilterClick}
                                data-id={category.id}
                                className='flex items-center justify-center py-[0.35rem] px-[1rem] text-white font-medium rounded-md bg-hovers cursor-pointer hover:bg-secHovers'>
                                <p>{category.name}</p>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}
export default Filters