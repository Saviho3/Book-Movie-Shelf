import supabase from '../config/supabaseClient.js'

const addItem = async (item, table = 'books') => {
  console.log(`📦 Trying to insert into table "${table}":`, item)

  const { data, error } = await supabase
    .from(table) //added dynamic table name so we can add books and movies depending on data
    .insert([item])

  if (error) {
    console.warn('⚠️ Supabase warning:', error.message)
    return false
  }

  if (!data || data.length === 0) {
    console.warn('⚠️ Insert returned no data (possible RLS warning), assuming success anyway')
    return true
  }

  console.log('✅ Insert success:', data)
  return data
}

export default addItem