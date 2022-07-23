import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createAnimal from "app/animals/mutations/createAnimal"
import { AnimalForm, FORM_ERROR } from "app/animals/components/AnimalForm"

const NewAnimalPage = () => {
  const router = useRouter()
  const [createAnimalMutation] = useMutation(createAnimal)

  return (
    <Layout title={"Create New Animal"}>
      <h1>Create New Animal</h1>

      <AnimalForm
        submitText="Create Animal"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAnimal}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const animal = await createAnimalMutation(values)
            router.push({ pathname: `/animals/[animalId]`, query: { animalId: animal.id } })
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={{ pathname: "/animals" }}>
          <a>Animals</a>
        </Link>
      </p>
    </Layout>
  )
}

NewAnimalPage.authenticate = true

export default NewAnimalPage
