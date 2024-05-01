import './list.css'
import Card from"../card/Card"


function List(){
    const listData = [];
  return (
    <div className='list'>
      {listData.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List