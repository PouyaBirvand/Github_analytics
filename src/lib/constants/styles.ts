export const getVariantStyles = (variant: string) => {
  switch (variant) {
    case 'hero':
      return {
        container:
          'w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto',
        form: 'flex flex-col sm:flex-row gap-2 sm:gap-3',
        input:
          'h-12 sm:h-14 text-sm sm:text-base md:text-lg pl-3 sm:pl-4 bg-background/80 backdrop-blur-sm border-2 border-border/50 focus:border-primary/50 rounded-xl sm:rounded-2xl shadow-lg',
        button:
          'h-12 sm:h-14 px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl sm:rounded-2xl shadow-lg whitespace-nowrap',
        icon: 'w-4 h-4 sm:w-5 h-5 md:w-6 md:h-6 left-3 sm:left-4',
        sparkles: 'w-4 h-4 sm:w-5 sm:h-5',
      };
    case 'cta':
      return {
        container: 'w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto',
        form: 'flex flex-col sm:flex-row gap-2 sm:gap-3',
        input:
          'h-10 sm:h-12 pl-10 sm:pl-12 text-sm sm:text-base bg-white/10 backdrop-blur-sm border-white/20 focus:border-white/40 text-white placeholder:text-white/70 rounded-lg sm:rounded-xl',
        button:
          'h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base bg-white text-gray-900 hover:bg-white/90 font-semibold rounded-lg sm:rounded-xl',
        icon: 'w-4 h-4 sm:w-5 sm:h-5 left-2 sm:left-3 text-white/70',
        sparkles: 'w-4 h-4',
      };
    default:
      return {
        container: 'w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto',
        form: 'flex flex-col sm:flex-row gap-2 sm:gap-3',
        input: 'h-9 sm:h-10 pl-8 sm:pl-10 text-sm',
        button: 'h-9 sm:h-10 px-3 sm:px-4 text-sm',
        icon: 'w-3 h-3 sm:w-4 sm:h-4 left-2 sm:left-3',
        sparkles: 'w-3 h-3 sm:w-4 sm:h-4',
      };
  }
};
