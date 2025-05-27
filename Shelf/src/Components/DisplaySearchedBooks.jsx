import React from 'react'

function DisplaySearchedBooks({books}) {
    return(
        <div className="grid grid-cols-2 gap-4 p-4">
            {books.map (book => {
                const info = book.volumeInfo;
                return(
                    <div id={book.id} className="book">
                        <h2 className="font-bold">{info.title}</h2>
                        {info.imageLinks?.thumbnail ? (
                        <img src={info.imageLinks.thumbnail} alt={info.title} />
                        ) : (
                        <p>{info.title}</p>)}

                    </div>
                )
            })}
        </div>
    )

}

export default DisplaySearchedBooks