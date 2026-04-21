import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { colors } from './theme';
import { PrimaryButton } from './components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HORIZONTAL_MARGIN = 32;
const CARD_WIDTH = SCREEN_WIDTH - HORIZONTAL_MARGIN * 2;
const CARD_HEIGHT = 320;

const cardData = [
  {
    id: 1,
    step: '01',
    icon: '🎯',
    title: 'Guess the Word',
    description: 'One player sees a secret word and must draw it while others guess!',
    tint: '#E0F4FF',
    accent: '#87CEEB',
    titleColor: '#4A90A4',
  },
  {
    id: 2,
    step: '02',
    icon: '✏️',
    title: 'Draw It Out',
    description: 'Sketch clues on the canvas — no text or numbers allowed!',
    tint: '#E0FFF4',
    accent: '#90EE90',
    titleColor: '#4A9B4A',
  },
  {
    id: 3,
    step: '03',
    icon: '⏱️',
    title: 'Race the Clock',
    description: 'You have 60 seconds per round — guess fast!',
    tint: '#FFE8D6',
    accent: '#FFB347',
    titleColor: '#CC8030',
  },
  {
    id: 4,
    step: '04',
    icon: '👥',
    title: 'Team Play',
    description: 'Work together — one draws, everyone guesses!',
    tint: '#FFE4EC',
    accent: '#FFB6C1',
    titleColor: '#CC6B8A',
  },
  {
    id: 5,
    step: '05',
    icon: '🎯',
    title: 'Earn Points',
    description: 'Correct guesses earn points for your team!',
    tint: '#F0E6FF',
    accent: '#DDA0DD',
    titleColor: '#8B5A9B',
  },
  {
    id: 6,
    step: '06',
    icon: '🏆',
    title: 'Win Together',
    description: 'First team to 50 points wins the game!',
    tint: '#FFFACD',
    accent: '#F0E68C',
    titleColor: '#B8A830',
  },
  {
    id: 7,
    step: '07',
    icon: '🎮',
    title: 'Ready to play?',
    description: '',
    tint: '#E0F4FF',
    accent: '#87CEEB',
    titleColor: '#4A90A4',
  },
];

interface CardItemProps {
  item: typeof cardData[0];
  onClose: () => void;
  onStartGame: () => void;
}

function CardItem({ item, onClose, onStartGame }: CardItemProps) {
  return (
    <View style={[styles.card, { backgroundColor: item.tint }]}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeIcon}>×</Text>
      </TouchableOpacity>

      <Text style={styles.stepLabel}>{item.step}</Text>

      <View style={styles.cardContentWrapper}>
        <Text style={styles.cardIcon}>{item.icon}</Text>

        <Text style={[styles.cardTitle, { color: item.titleColor }]}>{item.title}</Text>

        {item.id === 7 ? (
          <View style={styles.startButtonContainer}>
            <PrimaryButton title="Start Game" onPress={onStartGame} />
          </View>
        ) : (
          <Text style={styles.cardDescription}>{item.description}</Text>
        )}
      </View>
    </View>
  );
}

interface HowToPlayModalProps {
  visible: boolean;
  onClose: () => void;
}

export function HowToPlayModal({ visible, onClose }: HowToPlayModalProps) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
    setCurrentIndex(index);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1, animated: true });
    }
  };

  const goForward = () => {
    if (currentIndex < cardData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    }
  };

  const handleStartGame = () => {
    onClose();
    router.push('/setup');
  };

  const currentCard = cardData[currentIndex];

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <FlatList
            ref={flatListRef}
            data={cardData}
            renderItem={({ item }) => (
              <CardItem
                item={item}
                onClose={onClose}
                onStartGame={handleStartGame}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            snapToInterval={CARD_WIDTH}
            snapToAlignment="start"
            decelerationRate="fast"
            getItemLayout={(_, index) => ({
              length: CARD_WIDTH,
              offset: CARD_WIDTH * index,
              index,
            })}
          />

          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[styles.arrowButton, currentIndex === 0 && styles.arrowDisabled]}
              onPress={goBack}
              disabled={currentIndex === 0}
            >
              <Text style={[styles.arrowText, currentIndex === 0 && styles.arrowTextDisabled]}>
                ‹
              </Text>
            </TouchableOpacity>

            <View style={styles.dotsContainer}>
              {cardData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentIndex && {
                      backgroundColor: currentCard.accent,
                      width: 12,
                      borderRadius: 6,
                    },
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[styles.arrowButton, currentIndex === cardData.length - 1 && styles.arrowDisabled]}
              onPress={goForward}
              disabled={currentIndex === cardData.length - 1}
            >
              <Text style={[styles.arrowText, currentIndex === cardData.length - 1 && styles.arrowTextDisabled]}>
                ›
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: HORIZONTAL_MARGIN,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeIcon: {
    fontSize: 28,
    color: '#666',
    fontWeight: '300',
  },
  stepLabel: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  cardContentWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: 72,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  cardDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  startButtonContainer: {
    width: '100%',
    maxWidth: 200,
    marginTop: 16,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  arrowButton: {
    padding: 16,
  },
  arrowDisabled: {
    opacity: 0.3,
  },
  arrowText: {
    fontSize: 40,
    color: colors.text,
    fontWeight: '300',
  },
  arrowTextDisabled: {
    color: '#CCC',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCC',
    marginHorizontal: 4,
  },
});