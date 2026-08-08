const myArray = ["CRISTO", "PATRIA", "FAMILIA"] ;

function Arrays() {
    return (
        <div>
        <ol>
        {
             myArray.map((item, index) => {
                  return <li key={index}> { item } </li>
             })
        }
        </ol>
    </div>);
}

export default Arrays;
