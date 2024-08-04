import React from 'react';

//For the sake of understanding of Context API and State
// const About = () => {
//    const a = useContext(NoteContext)

//    useEffect(() => {
//     a.update();
//    }, [])

//   return (
//     <div>
//       This is About {a.state.name} and she is in {a.state.class}
//     </div>
//   )
// }

const About = () => {

  return (
    <div>
      <h1>About Us</h1>
      <p>Notebook reveals its personality and friendly tone i this About Us page, which opens with a “welcome” and ends with “let’s get social.”

        The copy reinforces its unique benefits as a staffing solution, evidenced by its values such as “your daily note”.

        The timeline begins with a classic yet engaging startup story, recounting how the founder discovered a solution to their problem with staffing admin and developed an in-house platform.

        Years later, this platform would be shared with the world, leading to over 320k companies now using Deputy.

        It is a great example of an About Us page for SaaS, startups, and organizations in the tech space.</p>
    </div>
  )
}

export default About
