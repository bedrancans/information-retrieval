import React, { useState } from 'react';
import { Input, Table } from 'antd';
const { Search } = Input;

const columns = [
  {
    title:  <div className="text-orange-500  p-2">summary</div>,
    dataIndex: 'summary',
    key: 'summary',
    
  },
  {
    title:  <div className="text-orange-500  p-2">reviewText</div>,
    dataIndex: 'reviewText',
    key: 'reviewText',
  },
  {
    title: <div className="text-orange-500  p-2">score</div>,
    dataIndex: 'score',
    key: 'score',
  },
  // Diğer kolonlarınızı buraya ekleyebilirsiniz.
];

const SearchTable = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(); // Arama terimi için state
    const [loading, setloading] = useState(false); // Arama terimi için state

    const onSearch = async () => {
        setloading(true);
      try {
        const response = await fetch('http://localhost:3001/search?term=' + searchTerm);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const jsonData = await response.json();
        const dataWithKey = jsonData.map(item => ({
          ...item,
          key: item._id,
        }));
    
        setData(dataWithKey);
        setloading(false);
      } catch (error) {
        console.error('Arama sırasında bir hata oluştu:', error);
        setloading(false);
      }
    };
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value); // Arama kutusuna girilen değeri güncelle
      console.log(searchTerm);
    };
  
    return (
      <div className='w-full h-full flex flex-col justify-start items-left'>
        
        
        <div className='text-[30px] text-white ml-10 mb-10 mt-10'>Amazon Yorumları Arama Motoru</div>

        <Search
        className=' w-1/2 ml-10'
          value={searchTerm}
          onChange={handleSearchChange}
          onSearch={onSearch}
          placeholder="Film adı girin..."
          style={{ marginBottom: 16 }}
        />
        <Table loading={loading} className=' w-1/2 ml-10 rounded-[150px]' columns={columns} dataSource={data} />
      </div>
    );
  };
  
  export default SearchTable;