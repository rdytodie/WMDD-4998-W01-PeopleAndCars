const Title = () => {
  const styles = getStyles();
  return <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>
};

const getStyles = () => ({
  title: {
    fontSize: 25,
    padding: "5px",
    marginBottom: "40px",
  },
});

export default Title;
