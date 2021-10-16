import developmentConfig from './development.config';
import productionConfig from './production.config';

export default process.env.NODE_ENV === 'development'
  ? developmentConfig
  : productionConfig;
