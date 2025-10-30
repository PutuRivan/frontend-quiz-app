export async function getQuestion(
  category: number,
  difficulty: string,
  type: string,
  amount: number
) {
  const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
  const data = await res.json()
  return data
}