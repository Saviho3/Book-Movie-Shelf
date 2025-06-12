import React, { useState } from 'react'
import addItem from '../util/addItem.js'
import './DisplaySearchedBooks.css';

function DisplaySearchedBooks({ books }) {


    const [popupBookID, setpopupBookID] = useState(false)
    const [rating, setRating] = useState(1)
    const [note, setNote] = useState("")
    const handleAdd = async (book) => {
    const info = book.volumeInfo

    const item = {
        title: info.title || 'Untitled',
        author: info.authors?.[0] || 'Unknown',
        genre: info.categories || [], // Supabase accepts text[]
        img: info.imageLinks?.thumbnail || '',
        username: localStorage.getItem('username'), // static for now, dynamic later
        description: info.description || '',
        rating: rating || null,
        note: note || null,
    }

    console.log('📦 Sending to Supabase:', item)

    const result = await addItem(item)

    if (result) {
        alert(`✅ "${item.title}" added to shelf!`)
    } else {
        console.error('🚨 Insert failed:', item)
        alert(`❌ Failed to add "${item.title}". Check console for details.`)
    }
    setpopupBookID(false);
    }

    return (
        <div className="book-grid">
            {books.map(book => {
                const info = book.volumeInfo;
                return (
                    <div key={book.id} className="book-card">
                        <h2 className="font-bold mb-2">{info.title}</h2>
                        {info.imageLinks?.thumbnail ? (
                            <img src={info.imageLinks.thumbnail} alt={info.title} className="book-image" />
                        ) : (
                            <p>{info.title}</p>
                        )}
                        <button
                            //onClick={() => handleAdd(book)}
                            onClick={() => setpopupBookID(book.id)}
                            className="add-button"
                        >
                            Add to Supabase
                        </button>


                        {
                            popupBookID == book.id && 
                        <div className="popup">
                            <h2>Poop</h2>
                            <button className="close-button" onClick={() => setpopupBookID(false)}>x</button>
                            <input
                              type="text"
                              name="description"
                              id="description"
                              placeholder="How did you feel about this book?"
                              onChange={(e) => setNote(e.target.value)}
                              className="popup-input"
                            />
                            <select
                              name="ratingOptions"
                              id="ratingOptions"
                              onChange={(e) => setRating(Number(e.target.value))}
                              className="popup-select"
                            >
                              {[...Array(10)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                            <button className="popup-add-button" onClick={() => handleAdd(book)}>Add Book</button>
                        </div>
                        }


                    </div>
                )
            })}
        </div>
    )
}

export default DisplaySearchedBooks