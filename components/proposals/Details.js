import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import theme from '../../theme';
import { calcDuration } from '../../utils';
const Details = ({ proposal, date }) => {
  const estimatedPayment = (num) => {
    let decrease = num * 0.1;
    let results = num - decrease;
    return results;
  };
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant='titleLarge' style={styles.title}>
          Your proposed terms
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          proposed Amount: ${proposal.proposedAmount}
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          Duration {calcDuration(proposal.duration)}
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          Cover letter
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          {proposal.coverLetter}
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          You’ll receive
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          The estimated payment, after service fees.
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          ${estimatedPayment(proposal.proposedAmount)}
        </Text>
        <Divider style={styles.Divider} />
        <Text variant='titleLarge' style={styles.title}>
          Jobs details
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          {proposal.jobPost.title}
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          Category: {proposal.jobPost.category}
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          Posted {date}
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          Description:
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          {' '}
          {proposal.jobPost.description}{' '}
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          {' '}
          Required skills
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          ( {proposal.jobPost.skillsRequired[0]},{' '}
          {proposal.jobPost.skillsRequired[1]} )
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          Duration {calcDuration(proposal.jobPost.duration)}
        </Text>
        <Text variant='titleMedium' style={styles.data}>
          Client’s budget: ${proposal.jobPost.budget}
        </Text>
        <Text variant='titleMedium' style={styles.title}>
          Only new freelancers
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.secondaryGray,
    borderRadius: theme.borderRadius,
    margin: 10,
  },
  title: {
    color: theme.colors.ternaryLight,
    marginVertical: 5,
  },
  data: {
    color: theme.colors.ternaryDark,
  },
  Divider: {
    marginVertical: 10,
  },
});

export default Details;
