'''
# ABC
id 
category_id
name
created_at
updated_at
'''

from abc import ABC, abstractmethod

class BaseRecord(ABC):
    
    @abstractmethod
    def __str__(self):
        """
        User-friendly representation of record
        """
        pass
    
    @abstractmethod
    def __repr__(self):
        """
        Developer-friendly representation of record
        """