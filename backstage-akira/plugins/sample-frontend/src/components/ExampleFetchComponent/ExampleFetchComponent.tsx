import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Progress,
  ResponseErrorPanel,
  ItemCardGrid,
  ItemCardHeader,
} from '@backstage/core-components';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import useAsync from 'react-use/lib/useAsync';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import crypto from 'crypto';

const useStyles = makeStyles({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
});

type User = {
  gender: string; // "male"
  name: {
    title: string; // "Mr",
    first: string; // "Duane",
    last: string; // "Reed"
  };
  email: string; // "duane.reed@example.com"
  picture: string; // "https://ui-avatars.com/api/name=Duane"
  nat: string; // "AU"
  md5: string; // "...some hash value..."
};
type UserResult = {
  results: User[];
};

type UserProps = {
  users: User[];
};

export const matchesMD5 = (email: string, md5: string): boolean => {
  const checkHash = crypto.createHash('md5').update(email).digest('hex');
  return checkHash === md5;
};

export const ItemCards = ({ users }: UserProps) => {
  const classes = useStyles();

  return (
    <ItemCardGrid>
      {users.map((value, key) => (
        <Card key={key}>
          <CardMedia>
            <ItemCardHeader
              title={`${value.name.title} ${value.name.first} ${value.name.last}`}
              subtitle={
                <img
                  src={value.picture}
                  className={classes.avatar}
                  alt={value.name.first}
                />
              }
            ></ItemCardHeader>
          </CardMedia>
          <CardContent>
            <div>
              {value.email}{' '}
              {matchesMD5(value.email, value.md5) ? (
                <VerifiedUserIcon style={{ color: '90EE90' }} />
              ) : (
                <ErrorIcon style={{ color: 'EB5406' }} />
              )}
            </div>
            <div>{value.nat}</div>
          </CardContent>
        </Card>
      ))}
    </ItemCardGrid>
  );
};

export const ExampleFetchComponent = () => {
  const config = useApi(configApiRef);
  const backendUrl = config.getString('backend.baseUrl');
  const { value, loading, error } = useAsync(async (): Promise<User[]> => {
    const url = `${backendUrl}/api/sample-backend/users`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const json = await response.json();
    const result = json as UserResult;
    return result.results;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <ItemCards users={value || []} />;
};
