import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ImageDisplayClicker from "../components/ImageDisplayClicker";
import Screen from "../components/Screen";
import colors from "../config/colors";

const content = {
  rock: {
    name: "rock",
    image: require("../assets/rock.png"),
  },
  paper: {
    name: "paper",
    image: require("../assets/paper.jpg"),
  },
  scissors: {
    name: "scissors",
    image: require("../assets/scissors.jpg"),
  },
};

function HomeScreen() {
  const [renderResult, setRenderResult] = useState(false);
  const [computerImage, setComputerImage] = useState("");
  const [userImage, setUserImage] = useState("");
  const [displayMessage, setDisplayMessage] = useState();
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const rpsGame = (userChoice) => {
    setUserImage(content[userChoice].image);

    const computerChoice = numberToChoice(Math.floor(Math.random() * 3));
    setComputerImage(content[computerChoice].image);

    const results = decideWinner([userChoice, computerChoice]);

    const message = finalMessage(results);
    setDisplayMessage(message);

    setRenderResult(true);
  };

  const numberToChoice = (number) => {
    return ["rock", "paper", "scissors"][number];
  };

  const decideWinner = ([yourChoice, computerChoice]) => {
    const rpsDataBase = {
      rock: { scissors: 1, rock: 0.5, paper: 0 },
      paper: { rock: 1, paper: 0.5, scissors: 0 },
      scissors: { paper: 1, scissors: 0.5, rock: 0 },
    };

    const yourScore = rpsDataBase[yourChoice][computerChoice];

    return yourScore;
  };

  const finalMessage = (yourScore) => {
    if (yourScore === 0) {
      if (userScore > 0) setUserScore(userScore - 1);
      setComputerScore(computerScore + 2);
      return { message: "You Lost", color: "red" };
    }

    if (yourScore === 0.5) {
      setComputerScore(computerScore + 1);
      setUserScore(userScore + 1);
      return { message: "You Tied", color: colors.gradientColor1 };
    }
    if (computerScore > 0) {
      setUserScore(userScore + 2);
      setComputerScore(computerScore - 1);
    }
    return { message: "You Won", color: "green" };
  };

  return (
    <Screen style={styles.container}>
      <AppText>Rock Paper Scissors</AppText>
      <ScrollView>
        {!renderResult && (
          <View style={styles.container2}>
            <ImageDisplayClicker
              image={content.rock.image}
              onPress={() => rpsGame(content.rock.name)}
              text={content.rock.name}
            />

            <ImageDisplayClicker
              image={content.paper.image}
              onPress={() => rpsGame(content.paper.name)}
              text={content.paper.name}
            />
            <ImageDisplayClicker
              image={content.scissors.image}
              onPress={() => rpsGame(content.scissors.name)}
              text={content.scissors.name}
            />
          </View>
        )}
        {renderResult && (
          <>
            <View style={styles.scoreContainer}>
              <AppText>Your Score: {userScore} </AppText>
              <AppText>Computer Score: {computerScore}</AppText>
            </View>
            <Screen style={styles.container}>
              <AppText>Your Choice</AppText>
              <Image style={styles.image} source={userImage} />
              <AppText style={{ color: displayMessage.color }}>
                {displayMessage.message}
              </AppText>
              <Image style={styles.image} source={computerImage} />
              <TouchableOpacity onPress={() => setRenderResult(false)}>
                <AppText style={{ marginBottom: 30 }}>Computer Choice</AppText>

                <AppButton
                  title={"Play Again?"}
                  onPress={() => setRenderResult(false)}
                />
              </TouchableOpacity>
            </Screen>
          </>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  container2: {
    paddingTop: 10,
  },
  image: {
    margin: 10,
    height: 160,
    width: 160,
    borderRadius: 80,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    width: "100%",
  },
});

export default HomeScreen;
