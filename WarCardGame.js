
import  React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function getCardValue(card) {
    const value = card.substring(0, card.length - 1);

    if (value === 'A') {
        return 14;
    }

    else if (value === 'K') {
        return 13;
    }

    else if (value === 'Q') {
        return 12;
    }

    else if (value === 'J') {
        return 11;
    }

    else {
        return parseInt(value);
    }
}

function drawCards(deck, numCards) {
    const cards = [];
    for (let i = 0; i < numCards; i++) {
        cards.push(deck.shift());
    }
    return cards;
}

function WarCardGame() {
    const [deck, setDeck] = useState(shuffle(suits.flatMap(suit => values.map(value => value + suit))));
    const [player1Cards, setPlayer1Cards] = useState([]);
    const [player2Cards, setPlayer2Cards] = useState([]);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [roundResult, setRoundResult] = useState('');

    function draw() {
        const player1Card = drawCards(deck, 1)[0];
        const player2Card = drawCards(deck, 1)[0];
        setPlayer1Cards([...player1Cards, player1Card]);
        setPlayer2Cards([...player2Cards, player2Card]);
        const player1Value = getCardValue(player1Card);
        const player2Value = getCardValue(player2Card);

        if (player1Value > player2Value) {
            setPlayer1Score(player1Score + 1);
            setRoundResult('Player 1 wins the round!');
        }

        else if (player2Value > player1Value) {
            setPlayer2Score(player2Score + 1);
            setRoundResult('Player 2 wins the round!');
        }

        else {
            const player1TieCards = drawCards(deck, 3);
            const player2TieCards = drawCards(deck, 3);
            const player1FourthCard = drawCards(deck, 1)[0];
            const player2FourthCard = drawCards(deck, 1)[0];
            setPlayer1Cards([...player1Cards, ...player1TieCards, player1FourthCard]);
            setPlayer2Cards([...player2Cards, ...player2TieCards, player2FourthCard]);
            const player1FourthValue = getCardValue(player1FourthCard);
            const player2FourthValue = getCardValue(player2FourthCard);

            if (player1FourthValue > player2FourthValue) {
                setPlayer1Score(player1Score + 4);
                setRoundResult('Player 1 wins the round!');
            }

            else {
                setPlayer2Score(player2Score + 4);
                setRoundResult('Player 2 wins the round!');
            }
        }
    }

    function reset() {
        setDeck(shuffle(suits.flatMap(suit => values.map(value => value + suit))));
        setPlayer1Cards([]);
        setPlayer2Cards([]);
        setPlayer1Score(0);
        setPlayer2Score(0);
        setRoundResult('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Player 1: {player1Score}</Text>
                <Text style={styles.scoreText}>Player 2: {player2Score}</Text>
            </View>
            {roundResult ? (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>{roundResult}</Text>
                </View>
            ) : (
                <TouchableOpacity onPress={draw} style={styles.drawButton}>
                    <Text style={styles.drawButtonText}>Draw</Text>
                </TouchableOpacity>
            )}
            <View style={styles.cardContainer}>
                {player1Cards.map(card => (
                    <View key={card} style={styles.card}>
                        <Text>{card}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.cardContainer}>
                {player2Cards.map(card => (
                    <View key={card} style={styles.card}>
                        <Text>{card}</Text>
                    </View>
                ))}
            </View>
            {roundResult && (
                <TouchableOpacity onPress={reset} style={styles.resetButton}>
                    <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    scoreContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    scoreText: {
        fontSize: 24,
        marginRight: 20,
    },
    drawButton: {
        backgroundColor: '#0099ff',
        padding: 20,
        borderRadius: 10,
    },
    drawButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    resultContainer: {
        backgroundColor: '#f2f2f2',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    resultText: {
        fontSize: 24,
        textAlign: 'center',
    },
    cardContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#f2f2f2',
        padding: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    resetButton: {
        backgroundColor: '#f2f2f2',
        padding: 20,
        borderRadius: 10,
    },
    resetButtonText: {
        fontSize: 24,
    },
});

export default WarCardGame;
