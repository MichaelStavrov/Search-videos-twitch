import {useRouter} from 'next/router'
import {Favorites} from '../Components/Favorites'

export default function favorites(props) {
  const router = useRouter()
  console.log(router);
  return (
    <>
       <div></div>
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}