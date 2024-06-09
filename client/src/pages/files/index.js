import Protect from '../../middlewares/Protect';

function Index() {
  return (
    <Protect>
      <h2>My Files</h2>
    </Protect>
  );
}

export default Index;
