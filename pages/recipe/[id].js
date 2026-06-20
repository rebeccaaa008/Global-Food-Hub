import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'
import recipes from '../../data/recipes.json'

export default function RecipeDetail() {
  const router = useRouter()
  const { id } = router.query

  if (!id) return <div>Loading...</div>

  const recipe = recipes.find(r => r.id === parseInt(id))

  if (!recipe) {
    return (
      <>
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-12">
          <p className="text-center text-xl text-gray-600">Recipe not found</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{recipe.name} - Global Food Hub</title>
        <meta name="description" content={recipe.description} />
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-8">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Recipe Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-dark mb-2">{recipe.name}</h1>
              <p className="text-gray-600 text-lg">{recipe.description}</p>
            </div>
            <button className="text-4xl hover:scale-110 transition">❤️</button>
          </div>

          <div className="bg-light p-4 rounded-lg mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Cuisine</p>
                <p className="font-bold text-dark">{recipe.cuisine}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Prep Time</p>
                <p className="font-bold text-dark">{recipe.prepTime} min</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Cook Time</p>
                <p className="font-bold text-dark">{recipe.cookTime} min</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Servings</p>
                <p className="font-bold text-dark">{recipe.servings}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            {recipe.tags.map((tag, idx) => (
              <span key={idx} className="bg-secondary text-white text-sm px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">📦 Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="flex items-center gap-3 p-2 hover:bg-light rounded">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-gray-700">
                    <strong>{ing.amount}</strong> {ing.unit} {ing.item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Info */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">⏱️ Quick Info</h2>
            <div className="bg-light p-6 rounded-lg space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Total Time</p>
                <p className="text-xl font-bold text-dark">{recipe.totalTime} minutes</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Difficulty Level</p>
                <p className="text-xl font-bold text-dark">{recipe.difficulty}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Country</p>
                <p className="text-xl font-bold text-dark">{recipe.country}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Category</p>
                <p className="text-xl font-bold text-dark">{recipe.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-4">👨‍🍳 Instructions</h2>
          <div className="space-y-4">
            {recipe.instructions.map((instruction, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  {idx + 1}
                </div>
                <p className="text-gray-700 pt-1">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="btn-primary"
        >
          ← Back to Recipes
        </button>
      </main>

      <Footer />
    </>
  )
}
