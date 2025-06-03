import React, { useState } from 'react'
import addItem from '../util/addItem.js'

function DisplaySearchedBooks({ books }) {


    const [popupBookID, setpopupBookID] = useState(false)
    const [rating, setRating] = useState(1)
    const handleAdd = async (book) => {
    const info = book.volumeInfo

    const item = {
        title: info.title || 'Untitled',
        author: info.authors?.[0] || 'Unknown',
        genre: info.categories || [], // Supabase accepts text[]
        img: info.imageLinks?.thumbnail || '',
        username: 'guest', // static for now, dynamic later
        description: info.description || '',
        rating: rating || null
    }

    console.log('📦 Sending to Supabase:', item)

    const result = await addItem(item)

    if (result) {
        alert(`✅ "${item.title}" added to shelf!`)
    } else {
        console.error('🚨 Insert failed:', item)
        alert(`❌ Failed to add "${item.title}". Check console for details.`)
    }
    setOpenPopup(false);
    }

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {books.map(book => {
                const info = book.volumeInfo;
                return (
                    <div key={book.id} className="book border p-4 rounded shadow">
                        <h2 className="font-bold mb-2">{info.title}</h2>
                        {info.imageLinks?.thumbnail ? (
                            <img src={info.imageLinks.thumbnail} alt={info.title} className="mb-2" />
                        ) : (
                            <p>{info.title}</p>
                        )}
                        <button
                            //onClick={() => handleAdd(book)}
                            onClick={() => setpopupBookID(book.id)}
                            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 mt-2"
                        >
                            Add to Supabase
                        </button>


                        {
                            popupBookID == book.id && 
                        <div>
                            <h2>Poop</h2>
                            <button onClick={() => setpopupBookID(false)}>x</button>
                            <select name="ratingOptions" 
                            id="ratingOptions"
                            onChange={(e) => setRating(Number(e.target.value))}>
                                {[...Array(10)].map((_, index) => (
                                    <option value = {index + 1}>{index + 1}</option>
                                ))}
                            </select>
                            <button onClick={() => handleAdd(book)}>Add Book</button>

                        </div>
                        }


                    </div>
                )
            })}
        </div>
    )
}

export default DisplaySearchedBooks