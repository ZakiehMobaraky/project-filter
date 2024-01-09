import React, { useEffect, useState } from 'react';
import './App.css'

const SearchFilter = () => {
    // نگهدارنده اصلی اطلاعات دریافتی
    const [data, setData] = useState([]);

    //  نگهدارنده داده‌ها برای اجرای جستجو و فیلتر
    const [searchApiData, setSearchApiData] = useState([]);

    // مقدار ورودی فیلد جستجو
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        const fetchData = () => {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(respons => respons.json())
                .then(json => {
                    setData(json)
                    setSearchApiData(json)
                })
        }
        fetchData();
    }, [])


    const handleFilter = (e) => {
        if (e.target.value === '') {
            // اگر مقدار ورودی خالی باشد، داده‌ها به حالت اصلی باز می‌گردد
            setData(searchApiData)
        } else {
            //  داده‌ها بر اساس نام یا نام کاربری یا سایت فیلتر می‌شوند
            const filterResult = searchApiData.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())
                || item.username.toLowerCase().includes(e.target.value.toLowerCase())
                || item.website.toLowerCase().includes(e.target.value.toLowerCase()))
            setData(filterResult)
        }
        setFilterValue(e.target.value)
    }


    return (<div style={{ margin: '20px 20%' }}>
        <div className='p-input-icon-right'>
            <input placeholder='Search' value={filterValue} onChange={(e) => handleFilter(e)} />
        </div>
        {/* یک جدول نیز برای نمایش اطلاعات کاربران و داده‌های فیلتر شده ایجاد شده است */}
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>website</th>
                </tr>

            </thead>
            <tbody>
                {data.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.website}</td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
    </div>);
}

export default SearchFilter;