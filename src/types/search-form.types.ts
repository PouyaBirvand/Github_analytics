export interface SearchFormProps {
  onSearch: (username: string) => void;
  loading?: boolean;
  variant?: 'default' | 'hero' | 'cta';
}
